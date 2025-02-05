/**a向量在b向量的投影向量 a*b=|a|*|b|cos(A) => |a|cos(A) = a*b/|b| */
export const projection = (a: [number, number], b: [number, number]) => {
  const d = (a[0] * b[0] + a[1] * b[1]) / (b[0] * b[0] + b[1] * b[1]);
  return [b[0] * d, b[1] * d];
};

/**法向量，逆时针90度 公式：(a,b)*(-b,a)=0 */
export const normalVec = (a: Readonly<[number, number]>) => {
  let [x, y] = unitVec(a);
  return [-y, x];
};

/**单位向量*/
export const unitVec = (a: Readonly<[number, number]>) => {
  let len = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
  return [a[0] / len, a[1] / len];
};

export const createMat4 = () => {
  const res = new Array(16).fill(0);
  res[0] = res[5] = res[10] = res[15] = 1;
  return res;
};

export const createMat = () => {
  const res = new Array(9).fill(0);
  res[0] = res[4] = res[8] = 1;
  return res;
};
/**
 * 
R=「cos(θ) sin(θ)
   −sin(θ) cos(θ)」
 */
export const rotate = (deg: number, x = 0, y = 0) => {
  const v = (Math.PI / 180) * deg;
  return rotateRadian(v, x, y);
};
/**旋转弧度 */
export const rotateRadian = (radian: number, x = 0, y = 0) => {
  const s = Math.sin(radian);
  const c = Math.cos(radian);
  const vec = createMat();
  vec[0] = vec[4] = c;
  vec[1] = s;
  vec[3] = -vec[1];
  vec[6] = x * (1 - c) + y * s;
  vec[7] = y * (1 - c) - x * s;
  return vec;
};

export const scale = (v: number) => {
  const vec = createMat();
  vec[0] = v;
  vec[4] = v;
  vec[8] = 1;

  return vec;
};

export const translate = (x = 0, y = 0) => {
  const mat = createMat();
  mat[6] = x;
  mat[7] = y;
  return mat;
};

/**矩阵变换 */
export const transform = (...args: number[][]) => {
  //matrix为列式
  if (args.length === 1) return args[0];
  return args.reduce((a, b) => {
    let res = new Array(9).fill(0) as number[];
    for (let x = 0; x < 3; x++) {
      // x列
      for (let y = 0; y < 3; y++) {
        // y行
        for (let k = 0; k < 3; k++) {
          res[x * 3 + y] += a[k * 3 + y] * b[x * 3 + k];
        }
      }
    }
    return res;
  });
};

export const toMat4 = (a: number[]) => {
  return [
    a[0],
    a[1],
    a[2],
    0,
    a[3],
    a[4],
    a[5],
    0,
    0,
    0,
    1,
    0,
    a[6],
    a[7],
    0,
    1,
  ];
};
