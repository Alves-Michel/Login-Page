// src/app/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('auth-token');

  if (token) {
    return true; // Permite o acesso à rota protegida
  } else {
    window.alert("Você precisa estar logado");
    router.navigate(['/login']); // Redireciona para o login
    return false; // Impede o acesso à rota
  }
};
