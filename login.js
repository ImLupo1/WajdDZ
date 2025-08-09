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
        }, 300);
      })
      .catch(error => {
        alert('حدث خطأ: ' + error.message);
      });
  });
}
