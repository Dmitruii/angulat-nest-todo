export class SignInDto {
    readonly email: string
    readonly password: string
}

export class SignUpDto extends SignInDto {
    readonly name: string
}