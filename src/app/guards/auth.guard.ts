// src/app/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('auth-token');
  if (token){
    return true;
   } else{
  window.alert("voce precisa estar logado")
}

  router.navigate(['/']);
  return false;
};
