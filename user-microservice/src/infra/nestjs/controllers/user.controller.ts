import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { UserDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  @Put(":id")
  async updateUser(@Param("id") id: string, @Body() userDto: UserDto) {
    return this.userService.updateUser(id, userDto);
  }

  @Post("login")
  async signin(@Body() userDto: UserDto) {
    return this.userService.signin(userDto);
  }

  @MessagePattern({ cmd: "get_user" })
  async getUser(userId: string) {
    return this.userService.findById(userId);
  }
}
