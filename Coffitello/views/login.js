export const login = `
<link rel="stylesheet" href="styles/login.css">
<section class="login-form">
  <h2>Login</h2>
  <form action="">
    <div class="login-block">
      <div class="input-field">
        <input type="text" placeholder="Enter Username" name="user-name" id="user-name" required>
      </div>
      <div class="input-field">
        <input type="password" placeholder="Enter Password" name="password" id="password" required>
      </div>
      <div class="actions">
        <button type="submit" id="login-btn">Login</button>
      </div>
    </div>
  </form>
  <div id="context-switch">
    <p>Don't have an account?</p>
    <a id="switch-link" href="">Register</a>
  </div>
</section>
`