export default function ({ $axios,$toast, $auth, redirect }) {
  $axios.onError(error => {
    if (error.response.status == 401){
      $toast.error("Время вашего токена истек!")
      $auth.logout()
      return redirect('login')
    }
    // else if (error.response.status === 500) {
    //   $toast.error("Ошибкв сервера!")
    //   return redirect('/sorry')
    // }
  })
}
