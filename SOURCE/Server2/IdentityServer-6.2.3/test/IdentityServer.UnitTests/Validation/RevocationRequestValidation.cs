﻿// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.


using System.Collections.Generic;
using System.Collections.Specialized;
using System.Threading.Tasks;
using Duende.IdentityServer;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Validation;
using FluentAssertions;
using IdentityModel;
using UnitTests.Common;
using Xunit;

namespace UnitTests.Validation;

public class RevocationRequestValidation
{
    private const string Category = "Revocation Request Validation Tests";

    private ITokenRevocationRequestValidator _validator;
    private Client _client;

    public RevocationRequestValidation()
    {
        _validator = new TokenRevocationRequestValidator(TestLogger.Create<TokenRevocationRequestValidator>());
        _client = new Client
        {
            ClientName = "Code Client",
            Enabled = true,
            ClientId = "codeclient",
            ClientSecrets = new List<Secret>
            {
                new Secret("secret".Sha256())
            },

            AllowedGrantTypes = GrantTypes.Code,

            RequireConsent = false,

            RedirectUris = new List<string>
            {
                "https://server/cb"
            },

            AuthorizationCodeLifetime = 60
        };
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task Empty_Parameters()
    {
        var parameters = new NameValueCollection();

        var result = await _validator.ValidateRequestAsync(parameters, _client);

        result.IsError.Should().BeTrue();
        result.Error.Should().Be(OidcConstants.TokenErrors.InvalidRequest);
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task Missing_Token_Valid_Hint()
    {
        var parameters = new NameValueCollection
        {
            { "token_type_hint", "access_token" }
        };

        var result = await _validator.ValidateRequestAsync(parameters, _client);

        result.IsError.Should().BeTrue();
        result.Error.Should().Be(OidcConstants.TokenErrors.InvalidRequest);
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task Valid_Token_And_AccessTokenHint()
    {
        var parameters = new NameValueCollection
        {
            { "token", "foo" },
            { "token_type_hint", "access_token" }
        };

        var result = await _validator.ValidateRequestAsync(parameters, _client);

        result.IsError.Should().BeFalse();
        result.Token.Should().Be("foo");
        result.TokenTypeHint.Should().Be("access_token");
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task Valid_Token_and_RefreshTokenHint()
    {
        var parameters = new NameValueCollection
        {
            { "token", "foo" },
            { "token_type_hint", "refresh_token" }
        };

        var result = await _validator.ValidateRequestAsync(parameters, _client);

        result.IsError.Should().BeFalse();
        result.Token.Should().Be("foo");
        result.TokenTypeHint.Should().Be("refresh_token");
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task Valid_Token_And_Missing_Hint()
    {
        var parameters = new NameValueCollection
        {
            { "token", "foo" }
        };

        var result = await _validator.ValidateRequestAsync(parameters, _client);

        result.IsError.Should().BeFalse();
        result.Token.Should().Be("foo");
        result.TokenTypeHint.Should().BeNull();
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task Valid_Token_And_Invalid_Hint()
    {
        var parameters = new NameValueCollection
        {
            { "token", "foo" },
            { "token_type_hint", "invalid" }
        };

        var result = await _validator.ValidateRequestAsync(parameters, _client);

        result.IsError.Should().BeTrue();
        result.Error.Should().Be(Constants.RevocationErrors.UnsupportedTokenType);
    }
}