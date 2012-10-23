<div id="signUp" class="signContianer">
  <h2>Sign Up:</h2>
  <div class="sign">
    <div>
      <label for="email">Email:</label>
      <input type="text" id="upEmail" name="email" value="" tabindex="<?= ++$tabIndex; ?>" />
    </div>
    <div>
      <label for="name">Your Name:</label>
      <input type="text" id="upName" name="name" value="" tabindex="<?= ++$tabIndex; ?>" />
    </div>
    <div>
      <label for="charName">Characters Name:</label>
      <input type="text" id="upCharName" name="charName" value="" tabindex="<?= ++$tabIndex; ?>" />
    </div>
    <div class="hideButton">
      <input type="button" class="signButton" id="submitSignUp" name="submitSignUp" value="Sign Up" tabindex="<?= ++$tabIndex; ?>" />
    </div>
  </div>
  <div class="signLoading">Loading</div>
</div>