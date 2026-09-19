export interface AndroidSafeguard {
  id: string;
  title: string;
  category: 'access_control' | 'surveillance' | 'storage_transparency' | 'policy_play';
  androidVersion: string;
  apiLevel: string;
  severityMitigated: 'Critical' | 'High' | 'Medium';
  counteredPermissionOrPattern: string;
  summary: string;
  howItWorks: string;
  manifestRule: string;
  defenseImpact: string;
}

export const ANDROID_SAFEGUARDS_DATA: AndroidSafeguard[] = [
  {
    id: 'restricted-settings',
    title: 'Restricted Settings for Sideloaded Apps',
    category: 'access_control',
    androidVersion: 'Android 13+',
    apiLevel: 'API 33+',
    severityMitigated: 'Critical',
    counteredPermissionOrPattern: 'BIND_ACCESSIBILITY_SERVICE & BIND_NOTIFICATION_LISTENER_SERVICE',
    summary:
      'Blocks apps installed outside authorized app stores from prompting users to enable high-privilege Accessibility or Notification services without explicit multi-step device authentication.',
    howItWorks:
      'The OS flags sideloaded APKs using the package installer source. When the app navigates the user to Accessibility settings, the toggles appear disabled with a modal explaining "Restricted Setting". The device owner must manually unlock App Info > Top Menu > "Allow restricted settings" with biometric or PIN verification.',
    manifestRule:
      'No manifest tag can bypass this; managed exclusively via Android AppOps framework (OP_ACCESS_RESTRICTED_SETTINGS).',
    defenseImpact:
      'Prevents social engineering and drive-by malware from acquiring keystroke logging and screen inspection permissions through misleading overlay guides.',
  },
  {
    id: 'fgs-types-camera-mic',
    title: 'Strict Foreground Service Types & Status Indicators',
    category: 'surveillance',
    androidVersion: 'Android 14+',
    apiLevel: 'API 34+',
    severityMitigated: 'Critical',
    counteredPermissionOrPattern: 'SandWebRTCService_ & Silent Camera/Mic Streaming',
    summary:
      'Requires every background service accessing audio, video, media projection, or location to declare explicit type tags and display persistent, non-dismissible notifications with system-rendered privacy dots.',
    howItWorks:
      'Apps invoking startForeground() must pass a service type matching android:foregroundServiceType in the manifest. Attempting to start camera or mic capture from the background without foreground eligibility throws a ForegroundServiceStartNotAllowedException.',
    manifestRule:
      '<service android:name=".MediaService" android:foregroundServiceType="camera|microphone" />',
    defenseImpact:
      'Eliminates hidden or background WebRTC streaming. The OS status bar illuminates a bright green hardware indicator dot whenever any sensor is active.',
  },
  {
    id: 'accessibility-content-audits',
    title: 'Accessibility Service Misuse & Abuse Restrictions',
    category: 'access_control',
    androidVersion: 'Android 12+ / Play Policy',
    apiLevel: 'API 31+',
    severityMitigated: 'Critical',
    counteredPermissionOrPattern: 'canRetrieveWindowContent="true" & Keystroke Interception',
    summary:
      'Restricts AccessibilityService usage exclusively to genuine accessibility tools assisting disabled individuals. Commercial apps employing it for app-locking, keylogging, or screen recording are rejected or flagged.',
    howItWorks:
      'Google Play Developer Program policy categorizes Accessibility API as an emergency exception. Apps using it must provide a prominent in-app disclosure prior to request and demonstrate user necessity. Modern Android logs accessibility event dispatch frequency and audits window inspection calls.',
    manifestRule:
      '<accessibility-service android:canRetrieveWindowContent="false" android:accessibilityFeedbackType="feedbackGeneric" />',
    defenseImpact:
      'Forces monitoring and enterprise tools onto official Android Enterprise (DPM) APIs rather than abusing accessibility hooks for clandestine screen capturing.',
  },
  {
    id: 'system-photo-picker',
    title: 'System Photo Picker & Granular Media Permissions',
    category: 'storage_transparency',
    androidVersion: 'Android 13 / 14',
    apiLevel: 'API 33/34',
    severityMitigated: 'High',
    counteredPermissionOrPattern: 'READ_EXTERNAL_STORAGE & Bulk File Scraping',
    summary:
      'Deprecates broad external storage access. Replaces it with individual granular media permissions and a zero-permission system photo picker.',
    howItWorks:
      'The System Photo Picker runs in a separate system process (PhotoPickerActivity). The target app never receives permission to inspect the user file system; it only receives a read-only Content URI for the single media file picked by the user.',
    manifestRule:
      'Replaced with READ_MEDIA_IMAGES, READ_MEDIA_VIDEO, and READ_MEDIA_VISUAL_USER_SELECTED (Android 14).',
    defenseImpact:
      'Prevents apps from scanning private photos, documents, and device storage in the background under the guise of an image upload utility.',
  },
  {
    id: 'package-visibility-queries',
    title: 'Package Visibility Filtering (<queries> Element)',
    category: 'storage_transparency',
    androidVersion: 'Android 11+',
    apiLevel: 'API 30+',
    severityMitigated: 'Medium',
    counteredPermissionOrPattern: 'QUERY_ALL_PACKAGES & App Usage Profiling',
    summary:
      'Restricts an app’s ability to query and list other installed applications on the device without explicit intent declarations in the manifest.',
    howItWorks:
      'By default, PackageManager.getInstalledApplications() only returns system core packages and the calling app. To view other packages, the app must declare specific explicit package names or intent filters inside <queries>. Broad QUERY_ALL_PACKAGES usage requires high-level verification in Google Play.',
    manifestRule:
      '<queries><intent><action android:name="android.intent.action.VIEW" /></intent></queries>',
    defenseImpact:
      'Deters surveillance software from silently building a comprehensive behavioral profile of installed dating apps, banking apps, or encrypted messengers.',
  },
  {
    id: 'device-admin-deprecation',
    title: 'Legacy Device Admin Deprecation in Favor of Work Profiles',
    category: 'access_control',
    androidVersion: 'Android 10+',
    apiLevel: 'API 29+',
    severityMitigated: 'Critical',
    counteredPermissionOrPattern: 'BIND_DEVICE_ADMIN & Anti-Uninstall Interceptors',
    summary:
      'Deprecates legacy DeviceAdmin policies (camera disable, lock wipe) on personal devices and isolates management to Android Enterprise Work Profiles with verifiable user consent.',
    howItWorks:
      'Device Administrator API is disabled for non-enterprise use cases. Google Play flags apps requiring Device Admin without enterprise enrollment. On Android 12+, uninstalling an app with Device Admin active prompts a clear system warning rather than allowing the app to trap the user.',
    manifestRule:
      'Replaced by DevicePolicyManager with Managed Profile Provisioning APIs.',
    defenseImpact:
      'Restores user sovereignty over personal devices, making it transparent and simple to deactivate and remove monitoring software.',
  },
  {
    id: 'play-protect-stalkerware-ban',
    title: 'Google Play Protect Stalkerware & Stealth Bans',
    category: 'policy_play',
    androidVersion: 'Continuous Play Protect',
    apiLevel: 'Global Android',
    severityMitigated: 'Critical',
    counteredPermissionOrPattern: 'KidHideIconActivity_ & Secret Code Dialers',
    summary:
      'Strictly prohibits apps from concealing their launcher icon, masquerading as system services, or employing hidden dialer codes to evade discovery.',
    howItWorks:
      'Play Protect actively scans device APKs via signature and behavioral heuristics. If an app attempts to disable its launcher Activity or hide from the App Drawer, Play Protect flags it as PUA (Potentially Unwanted Application) or Stalkerware, revokes its permissions, or prompts immediate uninstallation.',
    manifestRule:
      'Activity aliases or components dynamically disabling launcher intent-filters are flagged during Play Console automated pre-launch audits.',
    defenseImpact:
      'Prevents abusive deployment of monitoring software without the informed, continuous knowledge of the device holder.',
  },
  {
    id: 'one-time-permission-auto-reset',
    title: 'One-Time Permissions & Permission Auto-Reset',
    category: 'surveillance',
    androidVersion: 'Android 11 / 12+',
    apiLevel: 'API 30+',
    severityMitigated: 'High',
    counteredPermissionOrPattern: 'ACCESS_BACKGROUND_LOCATION & Long-Term Leaks',
    summary:
      'Allows users to grant microphone, camera, and location access for "Only this time". Unused apps have their permissions automatically revoked after a few months.',
    howItWorks:
      'One-time permission tokens expire as soon as the app moves out of the foreground or after a short inactivity timeout. Background location requires a separate, secondary system settings flow with explicit justification.',
    manifestRule:
      'Apps must gracefully handle SecurityException and prompt with shouldShowRequestPermissionRationale().',
    defenseImpact:
      'Mitigates persistent ambient tracking by ensuring permission grants are temporary and bounded by active user interaction.',
  },
];
