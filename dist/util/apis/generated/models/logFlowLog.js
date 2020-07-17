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
 * Class representing a LogFlowLog.
 */
class LogFlowLog {
  /**
   * Create a LogFlowLog.
   * @property {date} timestamp Log creation timestamp.
   * @property {uuid} installId Install ID.
   * @property {object} device Device characteristics.
   * @property {string} [device.sdkName] Name of the SDK. Consists of the name
   * of the SDK and the platform, e.g. "appcenter.ios", "hockeysdk.android".
   * @property {string} [device.sdkVersion] Version of the SDK in semver
   * format, e.g. "1.2.0" or "0.12.3-alpha.1".
   * @property {string} [device.wrapperSdkVersion] Version of the wrapper SDK
   * in semver format. When the SDK is embedding another base SDK (for example
   * Xamarin.Android wraps Android), the Xamarin specific version is populated
   * into this field while sdkVersion refers to the original Android SDK.
   * @property {string} [device.wrapperSdkName] Name of the wrapper SDK.
   * Consists of the name of the SDK and the wrapper platform, e.g.
   * "appcenter.xamarin", "hockeysdk.cordova".
   * @property {string} [device.model] Device model (example: iPad2,3).
   * @property {string} [device.oemName] Device manufacturer (example: HTC).
   * @property {string} [device.osName] OS name (example: iOS). The following
   * OS names are standardized (non-exclusive): Android, iOS, macOS, tvOS,
   * Windows.
   * @property {string} [device.osVersion] OS version (example: 9.3.0).
   * @property {string} [device.osBuild] OS build code (example: LMY47X).
   * @property {number} [device.osApiLevel] API level when applicable like in
   * Android (example: 15).
   * @property {string} [device.locale] Language code (example: en_US).
   * @property {number} [device.timeZoneOffset] The offset in minutes from UTC
   * for the device time zone, including daylight savings time.
   * @property {string} [device.screenSize] Screen size of the device in pixels
   * (example: 640x480).
   * @property {string} [device.appVersion] Application version name, e.g.
   * 1.1.0
   * @property {string} [device.carrierName] Carrier name (for mobile devices).
   * @property {string} [device.carrierCode] Carrier country code (for mobile
   * devices).
   * @property {string} [device.carrierCountry] Carrier country.
   * @property {string} [device.appBuild] The app's build number, e.g. 42.
   * @property {string} [device.appNamespace] The bundle identifier, package
   * identifier, or namespace, depending on what the individual plattforms use,
   * .e.g com.microsoft.example.
   * @property {string} [device.liveUpdateReleaseLabel] Label that is used to
   * identify application code 'version' released via Live Update beacon
   * running on device
   * @property {string} [device.liveUpdateDeploymentKey] Identifier of
   * environment that current application release belongs to, deployment key
   * then maps to environment like Production, Staging.
   * @property {string} [device.liveUpdatePackageHash] Hash of all files
   * (ReactNative or Cordova) deployed to device via LiveUpdate beacon. Helps
   * identify the Release version on device or need to download updates in
   * future.
   * @property {string} [device.wrapperRuntimeVersion] Version of the wrapper
   * technology framework (Xamarin runtime version or ReactNative or Cordova
   * etc...). See wrapper_sdk_name to see if this version refers to Xamarin or
   * ReactNative or other.
   * @property {string} type Polymorphic Discriminator
   */
  constructor() {
  }

  /**
   * Defines the metadata of LogFlowLog
   *
   * @returns {object} metadata of LogFlowLog
   *
   */
  mapper() {
    return {
      required: false,
      serializedName: 'LogFlowLog',
      type: {
        name: 'Composite',
        polymorphicDiscriminator: {
          serializedName: 'type',
          clientName: 'type'
        },
        uberParent: 'LogFlowLog',
        className: 'LogFlowLog',
        modelProperties: {
          timestamp: {
            required: true,
            serializedName: 'timestamp',
            type: {
              name: 'DateTime'
            }
          },
          installId: {
            required: true,
            serializedName: 'install_id',
            type: {
              name: 'String'
            }
          },
          device: {
            required: true,
            serializedName: 'device',
            type: {
              name: 'Composite',
              className: 'LogFlowLogDevice'
            }
          },
          type: {
            required: true,
            serializedName: 'type',
            isPolymorphicDiscriminator: true,
            type: {
              name: 'String'
            }
          }
        }
      }
    };
  }
}

module.exports = LogFlowLog;
