﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AasxServerStandardBib.Exceptions
{
    public class OperationVariableException : Exception
    {
        public OperationVariableException(string message) : base(message)
        {

        }
    }
}
