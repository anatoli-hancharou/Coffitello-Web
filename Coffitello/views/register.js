export const register = `
<link rel="stylesheet" href="styles/login.css">
<section class="login-form">
  <h2>Registration</h2>
  <form action="">
    <div class="login-block">
      <div class="input-field">
        <input type="text" placeholder="Enter Username" name="user-name" id="user-name" required>
      </div>
      <div class="input-field">
        <input type="password" placeholder="Enter Password" name="password" id="password" required>
      </div>
      <div class="actions">
        <button type="submit" id="register-btn">Register</button>
      </div>
    </div>
  </form>
</section>
`