﻿// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.


using System.Collections.Generic;
using System.Threading.Tasks;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Validation;

namespace IntegrationTests.Clients.Setup;

public class CustomResponseExtensionGrantValidator : IExtensionGrantValidator
{
    public Task ValidateAsync(ExtensionGrantValidationContext context)
    {
        var response = new Dictionary<string, object>
        {
            { "string_value", "some_string" },
            { "int_value", 42 },
            { "dto",  CustomResponseDto.Create }
        };

        var credential = context.Request.Raw.Get("outcome");

        if (credential == "succeed")
        {
            context.Result = new GrantValidationResult("bob", "custom", customResponse: response);
        }
        else
        {
            context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "invalid_credential", response);
        }

        return Task.CompletedTask;
    }

    public string GrantType
    {
        get { return "custom"; }
    }
}