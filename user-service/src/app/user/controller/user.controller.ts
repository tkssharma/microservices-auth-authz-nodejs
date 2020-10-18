import { Controller, Get, Post, Delete, Put, Body , Res,
  NotFoundException, HttpStatus, InternalServerErrorException, Param, HttpCode, ValidationPipe, UsePipes} from '@nestjs/common';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { PARAMETERS_FAILED_VALIDATION } from '../../../app.constants';
import { CreateUserDTO } from '../dto/user.dto';
import { ValidateObjectId } from '../pipe/user.pipe';
import { UserService } from '../services/user.service';

@Controller('/api/v1/user')
@UsePipes(new ValidationPipe({
  whitelist: true,
  transform: true,
}))
export class UserController {
    constructor(private userService: UserService) { }

    @Get('/')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'User has been successfully fetched'})
    @ApiBadRequestResponse({description: PARAMETERS_FAILED_VALIDATION})
    @ApiInternalServerErrorResponse({description: 'unable to fetch user detail activity'})
    async getUsers(@Res() res) {
      const user = await this.userService.getAllUser();
      return res.status(HttpStatus.OK).json({
            message: 'User has been successfully fetched',
            user
        });
    }
    @Post('/')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'created user successfully'})
    @ApiBadRequestResponse({description: PARAMETERS_FAILED_VALIDATION})
    @ApiInternalServerErrorResponse({description: 'unable to fetch user detail activity'})
    async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
      const user = await this.userService.createUser(createUserDTO);
      if (!user) { throw new InternalServerErrorException('Unable to create user'); }
      return res.status(HttpStatus.OK).json({
            message: 'User has been successfully created',
        });
    }

    @Get('/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'updated user successfully'})
    @ApiBadRequestResponse({description: PARAMETERS_FAILED_VALIDATION})
    @ApiInternalServerErrorResponse({description: 'unable to fetch user detail activity'})
    async getUser(@Res() res,  @Param('userId', new ValidateObjectId()) userId) {
      const user = await this.userService.getUser(userId);
      if (!user) { throw new NotFoundException('Unable to fetch user'); }
      return res.status(HttpStatus.OK).json({
            message: 'User has been fetched successfully',
            user
        });
    }

    @Put('/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'updated user successfully'})
    @ApiBadRequestResponse({description: PARAMETERS_FAILED_VALIDATION})
    @ApiInternalServerErrorResponse({description: 'unable to fetch user detail activity'})
    async updateUser(@Res() res,  @Param('userId', new ValidateObjectId()) userId, @Body() createUserDTO: CreateUserDTO) {
      const user = await this.userService.updateUser(userId, createUserDTO);
      if (!user) { throw new InternalServerErrorException('Unable to update user'); }
      return res.status(HttpStatus.OK).json({
            message: 'User has been successfully updated',
        });
    }

    @Delete('/:userId')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({description: 'user deleted successfully'})
    @ApiBadRequestResponse({description: PARAMETERS_FAILED_VALIDATION})
    @ApiInternalServerErrorResponse({description: 'unable to fetch user detail activity'})
    async deleteUser(@Res() res, @Param('userId', new ValidateObjectId()) userId) {
      const user = await this.userService.deleteUser(userId);
      if (!user) { throw new InternalServerErrorException('Unable to delete user'); }
      return res.status(HttpStatus.OK).json({
            message: 'User has been successfully deleted',
        });
    }
}
