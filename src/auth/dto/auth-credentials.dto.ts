import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,10}$/, { message: 'Password to weak' })
    password: string;
}