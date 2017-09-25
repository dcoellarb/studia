Code push
Studia-IOS
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ YZC0iBdZrvCSgz9lyQ4erzYzeaF40475a724-2a12-4f3f-b1b8-8f3283be762b │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ iuxLlcJEK9_r6RGEHaEAkJtWYWbr0475a724-2a12-4f3f-b1b8-8f3283be762b │
└────────────┴──────────────────────────────────────────────────────────────────┘
code-push release-react Studia-IOS ios -m --description "First upload"
code-push promote Studia-IOS Staging Production

Studia-Android 
┌────────────┬──────────────────────────────────────────────────────────────────┐
│ Name       │ Deployment Key                                                   │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Production │ tkk_TXjZgX8QdG5lAKz_Ftkrnwdv0475a724-2a12-4f3f-b1b8-8f3283be762b │
├────────────┼──────────────────────────────────────────────────────────────────┤
│ Staging    │ v_ooZ2XM6TqIY1p_d1md0lm8B6hs0475a724-2a12-4f3f-b1b8-8f3283be762b │
└────────────┴──────────────────────────────────────────────────────────────────┘
code-push release-react Studia-Android android -m --description "First upload"
code-push promote Studia-Android Staging Production

	1. react-native bundle --platform ios --dev false --entry-file index.ios.js --bundle-output iOS/main.jsbundle
	2. react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --sourcemap-output android/app/src/main/assets/index.android.map --assets-dest android/app/src/main/res/