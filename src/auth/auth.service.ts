import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';


@Injectable()
export class AuthService {

    logger = new Logger('Auth');

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {
    }

    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.singUp(authCredentialsDto);
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!username) {
            this.logger.error('Unauthorized Exception');
            throw new UnauthorizedException('Invalid Credentials')
        }

        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload)

        return { accessToken }
    }


}
