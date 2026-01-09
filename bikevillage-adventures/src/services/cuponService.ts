import { api } from '../lib/api';
import { Cupon } from '../types/auth.types';

export const cuponService = {
  async getMisCupones(perfilId: number): Promise<Cupon[]> {
    return await api.get<Cupon[]>(`/api/cupones/usuario/${perfilId}`);
  },

  async canjearCupon(qrCode: string): Promise<any> {
    // Ahora enviamos un objeto { qr: ... } como segundo parámetro (data)
    // El tercer parámetro (options) ya no necesita params.
    return await api.post(`/api/cupones/canjear`, { qr: qrCode });
}
};