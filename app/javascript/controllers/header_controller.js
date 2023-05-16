import { Controller } from "@hotwired/stimulus"
import { leave, toggle } from "el-transition"

export default class extends Controller {
  static targets = ['profileButton', 'profileMenu']

  connect() {
    this.profileButtonTarget.addEventListener('click', this.toggleDropdownProfile)
  }
  
  toggleDropdownProfile() {
    toggle(document.getElementById('profile-dropdown-items'));
  }

  hide() {
    const buttonClicked = this.profileButtonTarget.contains(this)

    if(!buttonClicked) {
      leave(this.profileMenuTarget)
    }
  }

  // hide() {
    // const buttonClicked = this.profileButtonTarget.contains(this)

  //   console.log(this)

  //   if (!buttonClicked) {
  //     leave(this.profileMenuTarget)
  //   }
  // }
  // connect() {
  //   this.openProfileMenuTarget.addEventListener('click', this.toggleDropdownProfile)
  // }

  // toggleDropdownProfile() {
  //   toggle(document.getElementById('profile-dropdown-items'));
  // }
}