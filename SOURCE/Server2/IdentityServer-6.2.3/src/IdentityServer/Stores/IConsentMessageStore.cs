﻿// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.


using System.Threading.Tasks;
using Duende.IdentityServer.Models;

namespace Duende.IdentityServer.Stores;

/// <summary>
/// Interface for consent messages that are sent from the consent UI to the authorization endpoint.
/// </summary>
public interface IConsentMessageStore
{
    /// <summary>
    /// Writes the consent response message.
    /// </summary>
    /// <param name="id">The id for the message.</param>
    /// <param name="message">The message.</param>
    Task WriteAsync(string id, Message<ConsentResponse> message);

    /// <summary>
    /// Reads the consent response message.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    Task<Message<ConsentResponse>> ReadAsync(string id);

    /// <summary>
    /// Deletes the consent response message.
    /// </summary>
    /// <param name="id">The identifier.</param>
    /// <returns></returns>
    Task DeleteAsync(string id);
}