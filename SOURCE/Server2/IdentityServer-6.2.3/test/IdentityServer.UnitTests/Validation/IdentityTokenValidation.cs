// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.


using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using FluentAssertions;
using IdentityModel;
using UnitTests.Validation.Setup;
using Xunit;

namespace UnitTests.Validation;

public class IdentityTokenValidation
{
    private const string Category = "Identity token validation";

    static IdentityTokenValidation()
    {
        JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task Valid_IdentityToken_DefaultKeyType()
    {
        var creator = Factory.CreateDefaultTokenCreator();
        var token = TokenFactory.CreateIdentityToken("roclient", "valid");
        var jwt = await creator.CreateTokenAsync(token);

        var validator = Factory.CreateTokenValidator();
        var result = await validator.ValidateIdentityTokenAsync(jwt, "roclient");

        result.IsError.Should().BeFalse();
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task Valid_IdentityToken_DefaultKeyType_no_ClientId_supplied()
    {
        var creator = Factory.CreateDefaultTokenCreator();
        var jwt = await creator.CreateTokenAsync(TokenFactory.CreateIdentityToken("roclient", "valid"));
        var validator = Factory.CreateTokenValidator();

        var result = await validator.ValidateIdentityTokenAsync(jwt, "roclient");
        result.IsError.Should().BeFalse();
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task Valid_IdentityToken_no_ClientId_supplied()
    {
        var creator = Factory.CreateDefaultTokenCreator();
        var jwt = await creator.CreateTokenAsync(TokenFactory.CreateIdentityToken("roclient", "valid"));
        var validator = Factory.CreateTokenValidator();

        var result = await validator.ValidateIdentityTokenAsync(jwt);
        result.IsError.Should().BeFalse();
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task IdentityToken_InvalidClientId()
    {
        var creator = Factory.CreateDefaultTokenCreator();
        var jwt = await creator.CreateTokenAsync(TokenFactory.CreateIdentityToken("roclient", "valid"));
        var validator = Factory.CreateTokenValidator();

        var result = await validator.ValidateIdentityTokenAsync(jwt, "invalid");
        result.IsError.Should().BeTrue();
        result.Error.Should().Be(OidcConstants.ProtectedResourceErrors.InvalidToken);
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task IdentityToken_Too_Long()
    {
        var creator = Factory.CreateDefaultTokenCreator();
        var jwt = await creator.CreateTokenAsync(TokenFactory.CreateIdentityTokenLong("roclient", "valid", 1000));
        var validator = Factory.CreateTokenValidator();

        var result = await validator.ValidateIdentityTokenAsync(jwt, "roclient");
        result.IsError.Should().BeTrue();
        result.Error.Should().Be(OidcConstants.ProtectedResourceErrors.InvalidToken);
    }

    [Fact]
    [Trait("Category", Category)]
    public async Task claims_that_collide_with_token_validation_should_be_ignored()
    {
        var creator = Factory.CreateDefaultTokenCreator();
        var id_token = TokenFactory.CreateIdentityToken("roclient", "sub");
        id_token.Claims.Add(new System.Security.Claims.Claim("aud", "some_aud"));

        // this should not throw
        var jwt = await creator.CreateTokenAsync(id_token);

        // check that the custom aud was ignored
        var payload = jwt.Split('.')[1];
        var json = Encoding.UTF8.GetString(Base64Url.Decode(payload));
        var values = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(json);
        values["aud"].GetString().Should().Be("roclient");
    }
}