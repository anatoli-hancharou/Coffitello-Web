
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  iconColor: '#716040',
  background: '#F9F4EF',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})