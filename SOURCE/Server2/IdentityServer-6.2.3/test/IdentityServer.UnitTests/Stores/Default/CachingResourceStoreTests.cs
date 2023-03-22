// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.


using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Duende.IdentityServer.Configuration;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Stores;
using FluentAssertions;
using UnitTests.Common;
using Xunit;

namespace UnitTests.Stores.Default;

public class CachingResourceStoreTests
{
    List<IdentityResource> _identityResources = new List<IdentityResource>();
    List<ApiResource> _apiResources = new List<ApiResource>();
    List<ApiScope> _apiScopes = new List<ApiScope>();
    InMemoryResourcesStore _store;
    IdentityServerOptions _options = new IdentityServerOptions();

    MockCache<ApiResource> _apiCache = new MockCache<ApiResource>();
    MockCache<IdentityResource> _identityCache = new MockCache<IdentityResource>();
    MockCache<ApiScope> _scopeCache = new MockCache<ApiScope>();
    MockCache<Resources> _resourceCache = new MockCache<Resources>();
    MockCache<CachingResourceStore<InMemoryResourcesStore>.ApiResourceNames> _apiResourceNamesCache = new MockCache<CachingResourceStore<InMemoryResourcesStore>.ApiResourceNames>();

    CachingResourceStore<InMemoryResourcesStore> _subject;

    public CachingResourceStoreTests()
    {
        _store = new InMemoryResourcesStore(_identityResources, _apiResources, _apiScopes);
        _subject = new CachingResourceStore<InMemoryResourcesStore>(
            _options, 
            _store,
            _identityCache,
            _apiCache,
            _scopeCache,
            _resourceCache,
            _apiResourceNamesCache);
    }

    [Fact]
    public async Task FindApiScopesByNameAsync_should_populate_cache()
    {
        _apiScopes.Add(new ApiScope("scope1"));
        _apiScopes.Add(new ApiScope("scope2"));
        _apiScopes.Add(new ApiScope("scope3"));
        _apiScopes.Add(new ApiScope("scope4")); 
        
        _scopeCache.Items.Count.Should().Be(0);

        var items = await _subject.FindApiScopesByNameAsync(new[] { "scope3", "scope1", "scope2", "invalid" });
        items.Count().Should().Be(3);

        _scopeCache.Items.Count.Should().Be(3);
    }
        
    [Fact]
    public async Task FindApiScopesByNameAsync_should_populate_missing_cache_items()
    {
        _apiScopes.Add(new ApiScope("scope1"));
        _apiScopes.Add(new ApiScope("scope2"));
        _apiScopes.Add(new ApiScope("scope3"));
        _apiScopes.Add(new ApiScope("scope4")); 
        
        _scopeCache.Items.Count.Should().Be(0);

        var items = await _subject.FindApiScopesByNameAsync(new[] { "scope1" });
        items.Count().Should().Be(1);
        _scopeCache.Items.Count.Should().Be(1);

        _apiScopes.Remove(_apiScopes.Single(x => x.Name == "scope1"));
        items = await _subject.FindApiScopesByNameAsync(new[] { "scope1", "scope2" });
        items.Count().Should().Be(2);
        _scopeCache.Items.Count.Should().Be(2);

        _apiScopes.Remove(_apiScopes.Single(x => x.Name == "scope2"));
        items = await _subject.FindApiScopesByNameAsync(new[] { "scope3", "scope2", "scope4" });
        items.Count().Should().Be(3);
        _scopeCache.Items.Count.Should().Be(4);

        // this shows we will find it in the cache, even if removed from the DB
        _apiScopes.Remove(_apiScopes.Single(x => x.Name == "scope3"));
        items = await _subject.FindApiScopesByNameAsync(new[] { "scope3", "scope1", "scope2" });
        items.Count().Should().Be(3);
        _scopeCache.Items.Count.Should().Be(4);
    }

    [Fact]
    public async Task FindApiResourcesByScopeNameAsync_should_populate_cache()
    {
        _apiResources.Add(new ApiResource("foo") { Scopes = { "foo2", "foo1" } });
        _apiResources.Add(new ApiResource("bar") { Scopes = { "bar2", "bar1" } });
        _apiScopes.Add(new ApiScope("foo2"));
        _apiScopes.Add(new ApiScope("foo1"));
        _apiScopes.Add(new ApiScope("bar2"));
        _apiScopes.Add(new ApiScope("bar1"));

        {
            _apiCache.Items.Count.Should().Be(0);
            _apiResourceNamesCache.Items.Count().Should().Be(0);
            var items = await _subject.FindApiResourcesByScopeNameAsync(new[] { "invalid" });
            items.Count().Should().Be(0);
            _apiCache.Items.Count.Should().Be(0);
            _apiResourceNamesCache.Items.Count().Should().Be(1);
        }

        {
            _apiCache.Items.Clear();
            _apiResourceNamesCache.Items.Clear();
            _resourceCache.Items.Clear();

            _apiCache.Items.Count.Should().Be(0);
            _apiResourceNamesCache.Items.Count().Should().Be(0);
            var items = await _subject.FindApiResourcesByScopeNameAsync(new[] { "foo1" });
            items.Count().Should().Be(1);
            items.Select(x => x.Name).Should().BeEquivalentTo(new[] { "foo" });
            _apiCache.Items.Count.Should().Be(1);
            _apiResourceNamesCache.Items.Count().Should().Be(1);
        }

        {
            var items = await _subject.FindApiResourcesByScopeNameAsync(new[] { "foo2" });
            items.Count().Should().Be(1);
            items.Select(x => x.Name).Should().BeEquivalentTo(new[] { "foo" });
            _apiCache.Items.Count.Should().Be(1);
            _apiResourceNamesCache.Items.Count().Should().Be(2);
        }

        {
            var items = await _subject.FindApiResourcesByScopeNameAsync(new[] { "foo1", "bar1" });
            items.Count().Should().Be(2);
            items.Select(x => x.Name).Should().BeEquivalentTo(new[] { "foo", "bar" });
            _apiCache.Items.Count.Should().Be(2);
            _apiResourceNamesCache.Items.Count().Should().Be(3);
        }

        {
            var items = await _subject.FindApiResourcesByScopeNameAsync(new[] { "foo2", "foo1", "bar2", "bar1" });
            items.Count().Should().Be(2);
            items.Select(x => x.Name).Should().BeEquivalentTo(new[] { "foo", "bar" });
            _apiCache.Items.Count.Should().Be(2);
            _apiResourceNamesCache.Items.Count().Should().Be(4);
        }

        {
            _apiCache.Items.Clear();
            _apiResourceNamesCache.Items.Clear();
            _resourceCache.Items.Clear();

            var items = await _subject.FindApiResourcesByScopeNameAsync(new[] { "foo2", "foo1", "bar2", "bar1" });
            items.Count().Should().Be(2);
            items.Select(x => x.Name).Should().BeEquivalentTo(new[] { "foo", "bar" });
            _apiCache.Items.Count.Should().Be(2);
            _apiResourceNamesCache.Items.Count().Should().Be(4);
        }

        {
            // should not need go to db
            _apiResources.Clear();
            _apiScopes.Clear();
            _identityResources.Clear();

            var items = await _subject.FindApiResourcesByScopeNameAsync(new[] { "foo2", "foo1", "bar2", "bar1" });
            items.Count().Should().Be(2);
            items.Select(x => x.Name).Should().BeEquivalentTo(new[] { "foo", "bar" });
            _apiCache.Items.Count.Should().Be(2);
            _apiResourceNamesCache.Items.Count().Should().Be(4);
        }
    }

    [Fact]
    public async Task FindApiResourcesByScopeNameAsync_should_return_same_results_twice()
    {
        _apiResources.Add(new ApiResource("foo") { Scopes = { "foo", "foo1" } });
        _apiResources.Add(new ApiResource("bar") { Scopes = { "bar", "bar1" } });
        _apiScopes.Add(new ApiScope("foo"));
        _apiScopes.Add(new ApiScope("foo1"));
        _apiScopes.Add(new ApiScope("bar"));
        _apiScopes.Add(new ApiScope("bar1"));

        {
            var items = await _subject.FindApiResourcesByScopeNameAsync(new[] { "foo", "foo1", "bar", "bar1" });
            items.Count().Should().Be(2);
            items.Select(x => x.Name).Should().BeEquivalentTo(new[] { "foo", "bar" });
        }
        {
            var items = await _subject.FindApiResourcesByScopeNameAsync(new[] { "foo", "foo1", "bar", "bar1" });
            items.Count().Should().Be(2);
            items.Select(x => x.Name).Should().BeEquivalentTo(new[] { "foo", "bar" });
        }
    }
}
