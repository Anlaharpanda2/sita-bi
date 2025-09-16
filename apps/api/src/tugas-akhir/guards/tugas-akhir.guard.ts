import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { TugasAkhirService } from '../tugas-akhir.service';

@Injectable()
export class TugasAkhirGuard implements CanActivate {
  constructor(private readonly tugasAkhirService: TugasAkhirService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; // Attached by JwtAuthGuard
    const tugasAkhirId = parseInt(request.params.id, 10);

    if (!user || !tugasAkhirId) {
      return false;
    }

    const tugasAkhir = await this.tugasAkhirService.findTugasAkhirById(tugasAkhirId);
    const userRoles = user.roles.map(r => r.name);

    // Admin and Kajur can validate any TA
    if (userRoles.includes('admin') || userRoles.includes('kajur')) {
      return true;
    }

    // Kaprodi can only validate TA from their specific program of study
    if (userRoles.includes('kaprodi-d3') && tugasAkhir.mahasiswa.prodi === 'D3') {
      return true;
    }

    if (userRoles.includes('kaprodi-d4') && tugasAkhir.mahasiswa.prodi === 'D4') {
      return true;
    }

    throw new ForbiddenException('You do not have permission to perform this action on this resource.');
  }
}
