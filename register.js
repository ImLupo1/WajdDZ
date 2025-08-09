const registerBtn = document.getElementById('registerBtn');
if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    const accountType = document.getElementById('accountType').value;
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!fullName) {
      alert('يرجى إدخال الاسم الكامل!');
      return;
    }
    if (!email || !password) {
      alert('يرجى ملء جميع الحقول!');
      return;
    }
    if (password !== confirmPassword) {
      alert('كلمات المرور غير متطابقة!');
      return;
    }

    if (accountType === 'worker') {
      const state = document.getElementById('state').value;
      const jobType = document.getElementById('jobType').value;

      if (!state) {
        alert('يرجى اختيار الولاية');
        return;
      }
      if (!jobType) {
        alert('يرجى اختيار نوع العمل');
        return;
      }
    }

    if (!navigator.geolocation) {
      alert('المتصفح لا يدعم خدمة الموقع الجغرافي');
      return;
    }

    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          return userCredential.user.updateProfile({ displayName: fullName })
            .then(() => {
              const uid = userCredential.user.uid;

              // بيانات المستخدم التي سيتم تخزينها
              const userData = {
                fullName: fullName,
                email: email,
                accountType: accountType,
                location: { latitude: lat, longitude: lng },
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
              };

              // إذا كان عامل، أضف الحقول الإضافية
              if (accountType === 'worker') {
                userData.state = document.getElementById('state').value;
                userData.jobType = document.getElementById('jobType').value;
              }

              return db.collection('users').doc(uid).set(userData);
            });
        })
        .then(() => {
          alert('تم إنشاء الحساب بنجاح مع تحديد الموقع!');
          window.location.href = 'login.html';
        })
        .catch(error => {
          alert('حدث خطأ: ' + error.message);
        });
    }, () => {
      alert('يرجى تفعيل خدمة الموقع للمتابعة');
    });
  });
}
