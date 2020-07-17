/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

'use strict';

/**
 * missing symbol crash group object
 *
 */
class ListOKResponseGroupsItem {
  /**
   * Create a ListOKResponseGroupsItem.
   * @property {string} symbolGroupId id of the symbol group
   * @property {number} [crashCount] number of crashes that belong to this
   * group
   * @property {number} [errorCount] number of errors that belong to this group
   * @property {string} appId application id
   * @property {string} appVer application version
   * @property {string} appBuild application build
   * @property {date} lastModified last update date for the group
   * @property {array} missingSymbols list of missing symbols
   * @property {string} status group status. Possible values include: 'active',
   * 'pending', 'closed'
   */
  constructor() {
  }

  /**
   * Defines the metadata of ListOKResponseGroupsItem
   *
   * @returns {object} metadata of ListOKResponseGroupsItem
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'ListOKResponse_groupsItem',
      type: {
        name: 'Composite',
        className: 'ListOKResponseGroupsItem',
        modelProperties: {
          symbolGroupId: {
            required: true,
            serializedName: 'symbol_group_id',
            type: {
              name: 'String'
            }
          },
          crashCount: {
            required: false,
            serializedName: 'crash_count',
            type: {
              name: 'Number'
            }
          },
          errorCount: {
            required: false,
            serializedName: 'error_count',
            type: {
              name: 'Number'
            }
          },
          appId: {
            required: true,
            serializedName: 'app_id',
            type: {
              name: 'String'
            }
          },
          appVer: {
            required: true,
            serializedName: 'app_ver',
            type: {
              name: 'String'
            }
          },
          appBuild: {
            required: true,
            serializedName: 'app_build',
            type: {
              name: 'String'
            }
          },
          lastModified: {
            required: true,
            serializedName: 'last_modified',
            type: {
              name: 'DateTime'
            }
          },
          missingSymbols: {
            required: true,
            serializedName: 'missing_symbols',
            type: {
              name: 'Sequence',
              element: {
                  required: false,
                  serializedName: 'ListOKResponseGroupsItemMissingSymbolsItemElementType',
                  type: {
                    name: 'Composite',
                    className: 'ListOKResponseGroupsItemMissingSymbolsItem'
                  }
              }
            }
          },
          status: {
            required: true,
            serializedName: 'status',
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = ListOKResponseGroupsItem;
