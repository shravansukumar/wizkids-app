import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([User]), PassportModule],
  providers: [AuthService, UserService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
