export default function ({ $auth, redirect }) {
  // If the user is not authenticated
  if ($auth.user.role != "super_admin") {
    return redirect('/')
  }
}
