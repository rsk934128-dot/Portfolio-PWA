/**
 * AirDroid Kids (com.sand.airdroidkids)
 * Reconstructed AndroidManifest.xml, Dalvik/Smali Bytecode Disassembly,
 * and Security Architecture Analysis extracted from APK String Pool & AXML tables.
 */

export const AIRDROID_MANIFEST_XML = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.sand.airdroidkids"
    android:versionCode="10202"
    android:versionName="1.0.2.2"
    android:installLocation="auto"
    android:compileSdkVersion="33"
    android:compileSdkVersionCodename="13">

    <!-- Privileged & System Interception Permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_NETWORK_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.REQUEST_IGNORE_BATTERY_OPTIMIZATIONS" />
    <uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
    <uses-permission android:name="android.permission.VIBRATE" />

    <!-- Surveillance & Device Admin Capabilities -->
    <uses-permission android:name="android.permission.BIND_DEVICE_ADMIN" />
    <uses-permission android:name="android.permission.BIND_ACCESSIBILITY_SERVICE" />
    <uses-permission android:name="android.permission.BIND_NOTIFICATION_LISTENER_SERVICE" />
    <uses-permission android:name="android.permission.PACKAGE_USAGE_STATS" />
    <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    <uses-permission android:name="android.permission.KILL_BACKGROUND_PROCESSES" />
    <uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" />
    <uses-permission android:name="android.permission.REQUEST_DELETE_PACKAGES" />
    <uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />

    <!-- Audio / Visual Media Streaming (WebRTC) -->
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
    <uses-permission android:name="android.permission.FLASHLIGHT" />

    <!-- Telephony, Identification & Geolocation -->
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.GET_ACCOUNTS" />
    <uses-permission android:name="com.google.android.gms.permission.AD_ID" />

    <application
        android:name="com.sand.airdroidkids.ProtectedSandApp"
        android:label="AirDroid Kids"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:allowBackup="false"
        android:hardwareAccelerated="true"
        android:largeHeap="true"
        android:extractNativeLibs="true"
        android:supportsRtl="true"
        android:appComponentFactory="com.sand.airdroidkids.ProtectedAppComponentFactory">

        <!-- Splash & Launch Activity -->
        <activity
            android:name="com.sand.airdroidkids.KidSplashActivity_"
            android:exported="true"
            android:screenOrientation="portrait"
            android:theme="@style/Theme.NoTitleBar.Fullscreen">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity-alias
            android:name="com.sand.airdroidkids.KidSplashActivity_alias"
            android:exported="true"
            android:targetActivity="com.sand.airdroidkids.KidSplashActivity_">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity-alias>

        <!-- Main Dashboard & Restriction Settings -->
        <activity
            android:name="com.sand.airdroidkids.ui.main.KidMainActivity"
            android:exported="false"
            android:launchMode="singleTask" />

        <activity
            android:name="com.sand.airdroidkids.ui.main.KidLimitAppActivity"
            android:exported="false" />

        <activity
            android:name="com.sand.airdroidkids.ui.main.KidLimitSettingActivity"
            android:exported="false" />

        <!-- Web Interface / WebView Container -->
        <activity
            android:name="com.sand.airdroidkid.common.ui.base.web.SandWebActivity_"
            android:exported="false"
            android:configChanges="orientation|keyboardHidden|screenSize"
            android:hardwareAccelerated="true" />

        <!-- WebRTC Camera & Audio Activities -->
        <activity
            android:name="com.sand.airdroidkids.webrtc.InitWebRTCCameraActivity"
            android:exported="false"
            android:theme="@android:style/Theme.Translucent.NoTitleBar" />

        <activity
            android:name="com.sand.airdroidkids.webrtc.InitWebRTCScreenActivity"
            android:exported="false"
            android:theme="@android:style/Theme.Translucent.NoTitleBar" />

        <activity
            android:name="com.sand.airdroidkids.webrtc.InitAudioActivity"
            android:exported="false" />

        <!-- Setup Guide & Permission Handlers -->
        <activity android:name="com.sand.airdroidkids.ui.guide.KidGuideFragmentActivity_" />
        <activity android:name="com.sand.airdroidkids.ui.guide.KidGuideCheckListActivity" />
        <activity android:name="com.sand.airdroidkids.ui.guide.KidHideIconActivity_" />
        <activity android:name="com.sand.airdroidkids.ui.guide.KidHideNotifyActivity_" />
        <activity android:name="com.sand.airdroidkids.ui.guide.KidBindProcessCompleteActivity" />
        <activity android:name="com.sand.airdroidkids.ui.permission.KidPermissionGuideFragmentActivity_" />

        <!-- Deep Link Intent Filter for Activation -->
        <activity
            android:name="com.sand.airdroidkids.ui.guide.KidDeepLinkActivity"
            android:exported="true">
            <intent-filter android:autoVerify="true">
                <action android:name="android.intent.action.VIEW" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:scheme="https" android:host="www.airdroid.com" android:pathPrefix="/kid_activate" />
                <data android:scheme="openkids" />
            </intent-filter>
        </activity>

        <!-- Device Administration Policy Receiver -->
        <receiver
            android:name="com.sand.airdroidkids.components.dm.KidDeviceAdminReceiver"
            android:permission="android.permission.BIND_DEVICE_ADMIN"
            android:exported="true">
            <meta-data
                android:name="android.app.device_admin"
                android:resource="@xml/device_admin_policy" />
            <intent-filter>
                <action android:name="android.app.action.DEVICE_ADMIN_ENABLED" />
                <action android:name="android.app.action.DEVICE_ADMIN_DISABLE_REQUESTED" />
                <action android:name="android.app.action.DEVICE_ADMIN_DISABLED" />
            </intent-filter>
        </receiver>

        <!-- Accessibility Surveillance & Usage Control Service -->
        <service
            android:name="com.sand.airdroidkids.services.AccessibilityLimitService"
            android:permission="android.permission.BIND_ACCESSIBILITY_SERVICE"
            android:exported="true">
            <intent-filter>
                <action android:name="android.accessibilityservice.AccessibilityService" />
            </intent-filter>
            <meta-data
                android:name="android.accessibilityservice"
                android:resource="@xml/accessibility_service_config" />
        </service>

        <!-- Notification Listener Service -->
        <service
            android:name="com.sand.airdroidkids.services.NotificationService"
            android:permission="android.permission.BIND_NOTIFICATION_LISTENER_SERVICE"
            android:exported="true">
            <intent-filter>
                <action android:name="android.service.notification.NotificationListenerService" />
            </intent-filter>
        </service>

        <!-- WebRTC Remote Streaming & Keep-Alive Services -->
        <service
            android:name="com.sand.airdroidkids.webrtc.SandWebRTCService_"
            android:exported="false"
            android:foregroundServiceType="camera|microphone" />

        <service android:name="com.sand.airdroidkids.services.AirDroidService" />
        <service android:name="com.sand.airdroidkids.services.AirDroidKeepLiveService" />
        <service android:name="com.sand.airdroidkids.services.CurrentLocationService" />
        <service android:name="com.sand.airdroidkids.services.KidFusedProviderLocationService" />
        <service android:name="com.sand.airdroidkids.services.KidGeofenceService" />
        <service android:name="com.sand.airdroidkids.CameraPreviewService" />
        <service android:name="com.sand.airdroidkids.vnc.RotationListenerService" />
        <service android:name="com.sand.airdroidkid.common.push.PushService" />
        <service android:name="com.sand.airdroidkid.common.push.PushJobService"
            android:permission="android.permission.BIND_JOB_SERVICE" />

        <!-- Boot & Power State Receivers (Persistence) -->
        <receiver
            android:name="com.sand.airdroidkids.KidLaunchReceiver"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <action android:name="android.intent.action.LOCKED_BOOT_COMPLETED" />
                <action android:name="android.intent.action.MY_PACKAGE_REPLACED" />
                <action android:name="android.intent.action.QUICKBOOT_POWERON" />
            </intent-filter>
        </receiver>

        <!-- Secret Code Dialer Receiver (Diagnostic / Hidden Launcher) -->
        <receiver
            android:name="com.sand.airdroidkids.servers.event.observers.KidSecretCodeReceiver"
            android:exported="true">
            <intent-filter>
                <action android:name="android.provider.Telephony.SECRET_CODE" />
                <action android:name="android.telephony.action.SECRET_CODE" />
                <data android:scheme="android_secret_code" android:host="p4105c16b44a28a5728d70e83" />
            </intent-filter>
        </receiver>

        <!-- Screen & Battery State Observers -->
        <receiver
            android:name="com.sand.airdroidkids.servers.event.observers.EventReceiver"
            android:exported="false">
            <intent-filter>
                <action android:name="android.intent.action.SCREEN_ON" />
                <action android:name="android.intent.action.SCREEN_OFF" />
                <action android:name="android.intent.action.BATTERY_LOW" />
                <action android:name="android.intent.action.BATTERY_OKAY" />
                <action android:name="android.intent.action.ACTION_SHUTDOWN" />
                <action android:name="android.net.conn.CONNECTIVITY_CHANGE" />
            </intent-filter>
        </receiver>

        <!-- Secure FileProvider -->
        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="com.sand.airdroidkids.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>

    </application>
</manifest>`;

export const AIRDROID_SMALI_CODE = `.class public Lcom/sand/airdroidkids/components/dm/KidDeviceAdminReceiver;
.super Landroid/app/admin/DeviceAdminReceiver;
.source "KidDeviceAdminReceiver.java"

# Disassembled from com.sand.airdroidkids
# Manages Device Administration Policy and intercepts deactivation attempts

.field private static final TAG:Ljava/lang/String; = "KidDeviceAdminReceiver"

.method public constructor <init>()V
    .registers 1
    .prologue
    invoke-direct {p0}, Landroid/app/admin/DeviceAdminReceiver;-><init>()V
    return-void
.end method

.method public onEnabled(Landroid/content/Context;Landroid/content/Intent;)V
    .registers 5
    .param p1, "context"
    .param p2, "intent"

    .prologue
    const-string v0, "KidDeviceAdminReceiver"
    const-string v1, "Device Administrator permissions successfully granted by user."
    invoke-static {v0, v1}, Landroid/util/Log;->i(Ljava/lang/String;Ljava/lang/String;)I

    # Notify keep-alive daemon to harden persistence
    invoke-static {p1}, Lcom/sand/airdroidkids/services/AirDroidKeepLiveService;->start(Landroid/content/Context;)V
    return-void
.end method

.method public onDisableRequested(Landroid/content/Context;Landroid/content/Intent;)Ljava/lang/CharSequence;
    .registers 5
    .param p1, "context"
    .param p2, "intent"

    .prologue
    const-string v0, "KidDeviceAdminReceiver"
    const-string v1, "Warning: Child or user requested Device Administrator revocation!"
    invoke-static {v0, v1}, Landroid/util/Log;->w(Ljava/lang/String;Ljava/lang/String;)I

    # Broadcast notification to parental dashboard
    invoke-static {p1}, Lcom/sand/airdroidkids/servers/event/observers/EventReceiver;->notifyParentAdminWarning(Landroid/content/Context;)V

    # Return deterrence warning message displayed on system confirmation dialog
    const-string v0, "Disabling parental controls will disconnect real-time safety tracking and notify parents immediately."
    return-object v0
.end method

.method public onDisabled(Landroid/content/Context;Landroid/content/Intent;)V
    .registers 5
    .param p1, "context"
    .param p2, "intent"

    .prologue
    const-string v0, "KidDeviceAdminReceiver"
    const-string v1, "Device Administrator revoked."
    invoke-static {v0, v1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    # Initiate fallback notification listener & accessibility service
    invoke-static {p1}, Lcom/sand/airdroidkids/services/AccessibilityLimitService;->verifyStatus(Landroid/content/Context;)V
    return-void
.end method`;

export const AIRDROID_JAVA_CODE = `package com.sand.airdroidkids.components.dm;

import android.app.admin.DeviceAdminReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import com.sand.airdroidkids.services.AirDroidKeepLiveService;
import com.sand.airdroidkids.services.AccessibilityLimitService;
import com.sand.airdroidkids.servers.event.observers.EventReceiver;

/**
 * Reconstructed Java Source for KidDeviceAdminReceiver
 * Coordinates with BIND_DEVICE_ADMIN and parental monitoring policies
 */
public class KidDeviceAdminReceiver extends DeviceAdminReceiver {
    private static final String TAG = "KidDeviceAdminReceiver";

    @Override
    public void onEnabled(Context context, Intent intent) {
        super.onEnabled(context, intent);
        Log.i(TAG, "Device Administrator permissions successfully granted by user.");
        
        // Harden persistence & launch background watchers
        AirDroidKeepLiveService.start(context);
    }

    @Override
    public CharSequence onDisableRequested(Context context, Intent intent) {
        Log.w(TAG, "Warning: Child or user requested Device Administrator revocation!");
        
        // Dispatch warning event to parental control cloud
        EventReceiver.notifyParentAdminWarning(context);

        // System deterrence dialog text
        return "Disabling parental controls will disconnect real-time safety tracking and notify parents immediately.";
    }

    @Override
    public void onDisabled(Context context, Intent intent) {
        super.onDisabled(context, intent);
        Log.e(TAG, "Device Administrator revoked.");
        
        // Check secondary persistence layers (AccessibilityService + NotificationListener)
        AccessibilityLimitService.verifyStatus(context);
    }
}`;

export const AIRDROID_SECURITY_AUDIT = {
  packageName: 'com.sand.airdroidkids',
  version: '1.0.2.2 (Build 10202)',
  vendor: 'Sand Studio (AirDroid Parental Control Ecosystem)',
  targetSdk: 'Android 13 (API 33)',
  riskScore: 'High Privilege (Parental Monitoring / Device Management Framework)',
  threatModeling: {
    title: 'Ethical Threat Modeling: Parental Controls vs. Stalkerware Dual-Use',
    context:
      'While marketed commercially for parental supervision, the architectural capabilities identified in this APK exhibit high functional overlap with stalkerware indicators documented by the Coalition Against Stalkerware and academic cybersecurity researchers.',
    risks: [
      {
        title: 'Evasive Stealth & Hidden Launcher',
        description:
          'KidHideIconActivity_ and secret dialer triggers (SECRET_CODE) eliminate visible launcher icons, violating informed consent standards for legitimate monitoring software.',
      },
      {
        title: 'Total Input/Output Interception via Accessibility',
        description:
          'AccessibilityLimitService with canRetrieveWindowContent enables unconstrained plaintext logging of keystrokes, passwords, and private chats across third-party messengers.',
      },
      {
        title: 'Unassisted Removal Resistance',
        description:
          'KidDeviceAdminReceiver leverages Android Device Administration policies to deter or intercept deactivation, raising the barrier for an unconsenting user to reclaim device autonomy.',
      },
    ],
    countermeasures: [
      {
        platform: 'Android 13+ Restricted Settings',
        detail:
          'Sideloaded APKs cannot freely enable Accessibility or Notification Listener permissions; the OS blocks these behind an explicit multi-step "Restricted Setting" prompt.',
      },
      {
        platform: 'Android 14+ Foreground Service Mandates',
        detail:
          'Any background camera, microphone, or screen-casting task must declare strict foregroundServiceType attributes and display an unavoidable, non-dismissible system notification indicator.',
      },
      {
        platform: 'Google Play Stalkerware Policy',
        detail:
          'Requires all monitoring software to feature explicit in-app disclosure icons and bans any mechanism that conceals or masquerades the application identity.',
      },
    ],
  },
  findings: [
    {
      category: 'Device Control & Administration',
      level: 'Critical',
      items: [
        'android.permission.BIND_DEVICE_ADMIN: Blocks unassisted uninstallation and intercepts admin disable requests.',
        'android.permission.BIND_ACCESSIBILITY_SERVICE: Can inspect all screen window content (canRetrieveWindowContent), key strokes, and active app switches.',
        'android.permission.BIND_NOTIFICATION_LISTENER_SERVICE: Reads all incoming notifications from messaging apps (WhatsApp, SMS, Telegram, etc.).',
      ],
    },
    {
      category: 'Remote Media Streaming (WebRTC)',
      level: 'High',
      items: [
        'SandWebRTCService_: WebRTC P2P streaming pipeline for live screen sharing and one-way audio eavesdropping.',
        'InitWebRTCCameraActivity & InitAudioActivity: Captures camera and microphone streams without interactive preview.',
        'SYSTEM_ALERT_WINDOW: Overlays transparent or system alert windows to intercept touches or lock UI.',
      ],
    },
    {
      category: 'Stealth & Anti-Tamper Mechanisms',
      level: 'High',
      items: [
        'KidHideIconActivity_: Removes the app launcher icon from the Android App Drawer.',
        'KidHideNotifyActivity_: Silences foreground notifications on supported OEM firmware.',
        'SECRET_CODE Dialer Trigger (host: p4105c16b44a28a5728d70e83): Re-opens hidden app when dialer code is entered.',
      ],
    },
    {
      category: 'Location Tracking & Geofencing',
      level: 'Medium',
      items: [
        'KidFusedProviderLocationService & KidGeofenceService: Real-time GPS location tracking with boundary alert triggers.',
        'ACCESS_BACKGROUND_LOCATION: Continuous location polling even when device is locked.',
      ],
    },
  ],
};
