// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.


using Duende.IdentityServer.Stores;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Duende.IdentityServer.Services;

namespace Duende.IdentityServer.Validation;

/// <summary>
/// Default custom token validator
/// </summary>
public class DefaultCustomTokenValidator : ICustomTokenValidator
{
    /// <summary>
    /// The logger
    /// </summary>
    protected readonly ILogger Logger;

    /// <summary>
    /// The user service
    /// </summary>
    protected readonly IProfileService Profile;

    /// <summary>
    /// The client store
    /// </summary>
    protected readonly IClientStore Clients;

    /// <summary>
    /// Custom validation logic for access tokens.
    /// </summary>
    /// <param name="result">The validation result so far.</param>
    /// <returns>
    /// The validation result
    /// </returns>
    public virtual Task<TokenValidationResult> ValidateAccessTokenAsync(TokenValidationResult result)
    {
        return Task.FromResult(result);
    }

    /// <summary>
    /// Custom validation logic for identity tokens.
    /// </summary>
    /// <param name="result">The validation result so far.</param>
    /// <returns>
    /// The validation result
    /// </returns>
    public virtual Task<TokenValidationResult> ValidateIdentityTokenAsync(TokenValidationResult result)
    {
        return Task.FromResult(result);
    }
}