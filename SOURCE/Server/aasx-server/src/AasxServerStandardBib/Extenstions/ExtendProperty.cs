﻿using AasCore.Aas3_0_RC02;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Extenstions
{
    public static class ExtendProperty
    {
        public static string ValueAsText(this Property property)
        {
            return "" + property.Value;
        }

        public static Property ConvertFromV10(this Property property, AasxCompatibilityModels.AdminShellV10.Property sourceProperty)
        {
            if (sourceProperty == null)
            {
                return null;
            }
            var propertyType = Stringification.DataTypeDefXsdFromString("xs:" + sourceProperty.valueType);
            if (propertyType != null)
            {
                property.ValueType = (DataTypeDefXsd)propertyType;
            }
            else
            {
                Console.WriteLine($"ValueType {sourceProperty.valueType} not found for property {sourceProperty.idShort}");
            }
            property.Value = sourceProperty.value;
            if (sourceProperty.valueId != null)
            {
                var keyList = new List<Key>();
                foreach (var refKey in sourceProperty.valueId.Keys)
                {
                    //keyList.Add(new Key(ExtensionsUtil.GetKeyTypeFromString(refKey.type), refKey.value));
                    var keyType = Stringification.KeyTypesFromString(refKey.type);
                    if (keyType != null)
                    {
                        keyList.Add(new Key((KeyTypes)keyType, refKey.value));
                    }
                    else
                    {
                        Console.WriteLine($"KeyType value {sourceProperty.valueType} not found for property {property.IdShort}");
                    }
                }
                property.ValueId = new Reference(ReferenceTypes.GlobalReference, keyList);
            }

            return property;
        }

        public static Property ConvertFromV20(this Property property, AasxCompatibilityModels.AdminShellV20.Property sourceProperty)
        {
            if (sourceProperty == null)
            {
                return null;
            }

            var propertyType = Stringification.DataTypeDefXsdFromString("xs:" + sourceProperty.valueType);
            if (propertyType != null)
            {
                property.ValueType = (DataTypeDefXsd)propertyType;
            }
            else
            {
                Console.WriteLine($"ValueType {sourceProperty.valueType} not found for property {sourceProperty.idShort}");
            }
            property.Value = sourceProperty.value;
            if (sourceProperty.valueId != null)
            {
                var keyList = new List<Key>();
                foreach (var refKey in sourceProperty.valueId.Keys)
                {
                    //keyList.Add(new Key(ExtensionsUtil.GetKeyTypeFromString(refKey.type), refKey.value));
                    var keyType = Stringification.KeyTypesFromString(refKey.type);
                    if (keyType != null)
                    {
                        keyList.Add(new Key((KeyTypes)keyType, refKey.value));
                    }
                    else
                    {
                        Console.WriteLine($"KeyType value {sourceProperty.valueType} not found for property {property.IdShort}");
                    }
                }
                property.ValueId = new Reference(ReferenceTypes.GlobalReference, keyList);
            }

            return property;
        }

        //TODO:jtikekar remove
        public static void UpdatePropertyFrom(this Property property, Property sourceProperty)
        {
            if (sourceProperty.Extensions != null)
            {
                property.Extensions = sourceProperty.Extensions;
            }
            if (sourceProperty.Category != null)
            {
                property.Category = sourceProperty.Category;
            }
            if (sourceProperty.IdShort != null)
            {
                property.IdShort = sourceProperty.IdShort;
            }
            if (sourceProperty.DisplayName != null)
            {
                property.DisplayName = sourceProperty.DisplayName;
            }
            if (sourceProperty.Description != null)
            {
                property.Description = sourceProperty.Description;
            }
            if (sourceProperty.Checksum != null)
            {
                property.Checksum = sourceProperty.Checksum;
            }
            if (sourceProperty.Kind != null)
            {
                property.Kind = sourceProperty.Kind;
            }
            if (sourceProperty.SemanticId != null)
            {
                property.SemanticId = sourceProperty.SemanticId;
            }
            if (sourceProperty.SupplementalSemanticIds != null)
            {
                property.SupplementalSemanticIds = sourceProperty.SupplementalSemanticIds;
            }
            if (sourceProperty.Qualifiers != null)
            {
                property.Qualifiers = sourceProperty.Qualifiers;
            }
            if (sourceProperty.DataSpecifications != null)
            {
                property.DataSpecifications = sourceProperty.DataSpecifications;
            }
            if (sourceProperty.ValueType != null)
            {
                property.ValueType = sourceProperty.ValueType;
            }
            if (sourceProperty.ValueId != null)
            {
                property.ValueId = sourceProperty.ValueId;
            }
            if (sourceProperty.Value != null)
            {
                property.Value = sourceProperty.Value;
            }
        }
    }
}
