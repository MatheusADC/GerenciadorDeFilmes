import { Component, computed, inject, signal } from '@angular/core';
import { email, Field, form, minLength, required } from '@angular/forms/signals';
import { confirmPassword } from '../../validators/confirm-password';
import { UserApi } from '../../../../core/services/user-api';
import { rxResource } from '@angular/core/rxjs-interop';
import { IRegisterParams } from '../../models/register-params';
import { setErrorMessage } from '../../../../shared/utils/set-error-message';

@Component({
  selector: 'app-register-user-form',
  imports: [Field],
  templateUrl: './register-user-form.html',
  styleUrl: './register-user-form.css',
})
export class RegisterUserForm {
  private readonly _userApi = inject(UserApi);

  registerModel = signal<IRegisterParams>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  registerForm = form(this.registerModel, (fieldPath) =>{
    required(fieldPath.name, { message: 'O Nome é obrigatório.' });

    required(fieldPath.email, { message: 'O E-mail é obrigatório.' });
    email(fieldPath.email, { message: 'O E-mail está inválido.' });

    required(fieldPath.password, { message: 'A Senha é obrigatória.' });
    minLength(fieldPath.password, 8, { message: 'A Senha deve ter no mínimo 8 caracteres.' });

    confirmPassword(fieldPath.confirmPassword, fieldPath.password);
  });

  registerParams = signal<IRegisterParams | undefined>(undefined);

  registerResource = rxResource({
    params: () => this.registerParams(),
    stream: ({ params }) => this._userApi.register(params.name, params.email, params.password),
  });

  registerError = computed(() => setErrorMessage(this.registerResource.error()));

  successMessage = computed(() => {
    const SUCCESS_REGISTRATION = this.registerResource.hasValue();

    return SUCCESS_REGISTRATION ? 'Usuário cadastrado com sucesso!' : undefined;
  });

  register() {
    const userInfos = this.registerForm().value();

    this.registerParams.set(userInfos);
  }
}
