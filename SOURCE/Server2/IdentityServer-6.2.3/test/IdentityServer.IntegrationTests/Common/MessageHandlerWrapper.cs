﻿// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.


using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace IntegrationTests.Common;

public class MessageHandlerWrapper : DelegatingHandler
{
    public HttpResponseMessage Response { get; set; }

    public MessageHandlerWrapper(HttpMessageHandler handler)
        : base(handler)
    {
    }

    protected async override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
    {
        Response = await base.SendAsync(request, cancellationToken);
        return Response;
    }
}