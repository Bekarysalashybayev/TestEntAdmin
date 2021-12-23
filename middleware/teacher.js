export default function ({ $auth, redirect }) {
  // If the user is not authenticated
  if ($auth.user.role != "teacher") {
    return redirect('/')
  }
}
