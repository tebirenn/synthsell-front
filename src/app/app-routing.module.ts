import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from '@app/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        // canLoad: [AuthGuard],
        loadChildren: () => import('@app/modules/main/main.module').then((m) => m.MainModule),
    },
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
