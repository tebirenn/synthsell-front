import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'signin',
        loadChildren: () =>
            import('@app/modules/authorization/authorization.module').then((m) => m.AuthorizationModule),
    },
    {
        path: 'signup',
        loadChildren: () => import('@app/modules/registration/registration.module').then((m) => m.RegistrationModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
