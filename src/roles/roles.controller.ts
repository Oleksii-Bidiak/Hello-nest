import { CreateRoleDto } from "./dto/create-role.dto";
import { Get, Body, Post, Param } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { Controller } from "@nestjs/common";

@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.rolesService.createRole(dto);
  }

  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
