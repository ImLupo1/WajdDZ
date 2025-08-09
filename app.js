// تسجيل مستخدم جديد مع إضافة الاسم الكامل
const registerBtn = document.getElementById('registerBtn');
if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    if (!fullName) {
      alert('يرجى إدخال الاسم الكامل!');
      return;
    }
    if (password !== confirmPassword) {
      alert('كلمات المرور غير متطابقة!');
      return;
    }
    if (!email || !password) {
      alert('يرجى ملء جميع الحقول!');
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // حفظ الاسم الكامل في بروفايل المستخدم
        return userCredential.user.updateProfile({
          displayName: fullName
        });
      })
      .then(() => {
        alert('تم إنشاء الحساب بنجاح!');
        window.location.href = 'login.html';
      })
      .catch((error) => {
        alert('حدث خطأ: ' + error.message);
      });
  });
}

// تسجيل الدخول
const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
      alert('يرجى ملء جميع الحقول!');
      return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        alert('تم تسجيل الدخول بنجاح!');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 200);
      })
      .catch((error) => {
        alert('حدث خطأ: ' + error.message);
      });
  });
}
