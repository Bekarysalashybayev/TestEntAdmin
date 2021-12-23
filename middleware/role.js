export default function ({ $auth, redirect }) {
  // If the user is not authenticated
  if (!$auth.user.role || $auth.user.role == "") {
    return redirect('login')
  }else if($auth.user.role == "super_admin"){
    return redirect('/admin')
  }else if($auth.user.role == "teacher"){
    return redirect('/teacher')
  }else if($auth.user.role == "adviser"){
    return redirect('/adviser')
  }
}
