﻿// Copyright (c) Duende Software. All rights reserved.
// See LICENSE in the project root for license information.


using System.Threading.Tasks;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;

namespace UnitTests.Validation.Setup;

internal class TestProfileService : IProfileService
{
    private bool _shouldBeActive;

    public TestProfileService(bool shouldBeActive = true)
    {
        _shouldBeActive = shouldBeActive;
    }

    public Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        return Task.CompletedTask;
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        context.IsActive = _shouldBeActive;
        return Task.CompletedTask;
    }
}