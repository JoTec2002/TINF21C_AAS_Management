﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AasCore.Aas3_0_RC02;
using AdminShellNS;

namespace AasxIntegrationBase
{
    /// <summary>
    /// This interface describes a connection for a server resource of AASX contents, such as OPC UA or REST
    /// </summary>
    public interface IAasxOnlineConnection
    {
        bool IsValid();
        bool IsConnected();
        string GetInfo();
        Stream GetThumbnailStream();
        string UpdatePropertyValue(AasCore.Aas3_0_RC02.Environment env, Submodel submodel, ISubmodelElement sme);
    }
}