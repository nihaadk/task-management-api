import { Controller, Post, Body, ValidationPipe, Logger } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    private logger = new Logger('AuthController');
    constructor(private authService: AuthService) { }

    @Post('/signup')
    singUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        this.logger.verbose('Register new user')
        return this.authService.singUp(authCredentialsDto);
    }

    @Post('/signin')
    singIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        this.logger.verbose('Loggin user')
        return this.authService.singIn(authCredentialsDto);
    }
}
