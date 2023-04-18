<#
.SYNOPSIS
This script packages files to be released.
#>

$ErrorActionPreference = "Stop"

Import-Module (Join-Path $PSScriptRoot Common.psm1) -Function `
    GetArtefactsDir

function PackageRelease($outputDir)
{
    $baseBuildDir = Join-Path $( GetArtefactsDir ) "build" `
        | Join-Path -ChildPath "Release"

    $targets = $(
    "AasxServerBlazor"
    )

    New-Item -ItemType Directory -Force -Path $outputDir|Out-Null

    foreach ($target in $targets)
    {
        $buildDir = Join-Path $baseBuildDir $target

        if (!(Test-Path $buildDir))
        {
            throw ("The build directory with the release does " +
                    "not exist: $buildDir; did you build the targets " +
                    "with BuildForRelease.ps1?")
        }

        $archPath = Join-Path $outputDir "$target.zip"

        Write-Host "Compressing to: $archPath"

        Compress-Archive `
            -Path $buildDir `
            -DestinationPath $archPath
    }

    # Do not copy the source code in the releases.
    # The source code will be distributed automatically through Github releases.

    Write-Host "Done packaging the release."
}

function Main
{
    $outputDir = Join-Path $( GetArtefactsDir ) "release" 

    if (Test-Path $outputDir)
    {
        Write-Host ("Removing previous release so that " +
                "the new release is packaged clean: $outputDir")
        Remove-Item -Recurse -Force $outputDir
    }

    PackageRelease -outputDir $outputDir
}

$previousLocation = Get-Location; try
{
    Main
}
finally
{
    Set-Location $previousLocation
}
