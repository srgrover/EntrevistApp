import { EditProfileDialogComponent } from './../../../shared/components/profile/edit/edit-profile-dialog.component';
//import { OpenBy } from './../../shared/Enum/OpenBy';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
//import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public currentUser!: any;

  constructor(
    private auth: AuthService,
    public dialog: MatDialog,
    private readonly router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCurrentUser();
    if(environment.debug) console.log("USER", this.currentUser);
    
  }

  getCurrentUser() {
    this.currentUser = this.auth.getCurrentUser();
  }

  editProfile() {
    const dialogRefEdit = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      height: '71.5vh',
      minHeight: '71.5vh',
      data: {
        title: 'Editar información',
        subtitle:
          'Edita tu información básica y así podrás reconocer tu cuenta más fácilmente. Elige un nombre para mostra y una imagen de perfil mediante URL',
        currentUser: this.currentUser,
      },
    });
  }

  resetPassword() {
    /*const dialogRefDelete = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: {
        title: 'Recuperar contraseña',
        subtitle: 'Se va a enviar un email a la dirección de correo electrónico que proporcionaste en tu resgistro. Pulsa sobre la URL que aparece en este email y cambia tu contraseña. Es necesario tener verificado el email',
        openBy: OpenBy.resetPassword,
        data: this.currentUser?.email,
      },
    });

    dialogRefDelete.afterClosed().subscribe(async (result) => {
      if (result) {
        try {
          if (
            this.currentUser &&
            this.currentUser.email &&
            this.currentUser.emailVerified
          ){
            await this.auth.resetPassword(this.currentUser.email);
            this.auth.logout();
            this.openSnackBar('Email enviado correctamente. Vuelve a iniciar sesión', 'Ok', 'bg-success');
            this.router.navigate(['/login']);
          }
          else
            this.openSnackBar(
              'El usuario no existe o tu dirección de email no está verificada',
              'Ok',
              'bg-danger'
            );
          //Swal.fire('Invitado eliminado', 'Se ha eliminado el invitado correctamente', 'success');
        } catch (err) {
          //Swal.fire('Oops...', 'Hubo un error al eliminar al invitado', 'error');
          this.openSnackBar(
            'Oops...Hubo un error al enviar el email de recuperación',
            'Ok',
            'bg-danger'
          );
        }
      }
    });*/
  }

  openSnackBar(message: string, action: string, type: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: [type],
    });
  }

  async sendEmailVerification(){
    await this.auth.sendEmailVerification(this.currentUser)
    .then(() => {
      this.openSnackBar('Email enviado correctamente. Verifica tu email', 'Ok', 'bg-success');
    })
    .catch(() => {
      this.openSnackBar(
        'Oops...Hubo un error al enviar el email de verificación',
        'Ok',
        'bg-danger'
      );
    });
  }
}
