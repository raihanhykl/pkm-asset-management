/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// // app/(auth)/login/page.tsx
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import Cookies from "js-cookie";
// import { Package, Loader2, Eye, EyeOff } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// // import { useToast } from '@/components/ui/use-toast';
// import apiClient from "@/lib/api/client";
// import { TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/constants";
// import { ApiResponse, AuthResponse } from "@/types";
// import { toast } from "sonner";

// const loginSchema = z.object({
//   email: z
//     .string()
//     .min(1, "Email wajib diisi")
//     .email("Format email tidak valid"),
//   password: z
//     .string()
//     .min(1, "Password wajib diisi")
//     .min(6, "Password minimal 6 karakter"),
// });

// type LoginForm = z.infer<typeof loginSchema>;

// export default function LoginPage() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const form = useForm<LoginForm>({
//     resolver: zodResolver(loginSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit = async (data: LoginForm) => {
//     setIsLoading(true);

//     try {
//       const response = await apiClient.post<ApiResponse<AuthResponse>>(
//         "/auth/login",
//         data
//       );
//       const { user, access_token, refresh_token } = response.data.data;

//       Cookies.set(TOKEN_KEY, access_token, { expires: 7 });
//       if (refresh_token) {
//         Cookies.set(REFRESH_TOKEN_KEY, refresh_token, { expires: 30 });
//       }

//       toast("Login Berhasil", {
//         description: `Selamat datang, ${user.name}!`,
//         // description: `Selamat datang!`,
//       });

//       router.push("/dashboard");
//     } catch (error: any) {
//       const message =
//         error.response?.data?.message || "Terjadi kesalahan saat login";

//       toast.error("Login Gagal", {
//         description: message,
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1 text-center">
//           <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
//             <Package className="h-8 w-8 text-primary-foreground" />
//           </div>
//           <CardTitle className="text-2xl font-bold">
//             PKM Asset Management
//           </CardTitle>
//           <CardDescription>
//             Masuk ke akun Anda untuk melanjutkan
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//               <FormField
//                 control={form.control}
//                 name="email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="email"
//                         placeholder="email@example.com"
//                         disabled={isLoading}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="password"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Password</FormLabel>
//                     <FormControl>
//                       <div className="relative">
//                         <Input
//                           type={showPassword ? "text" : "password"}
//                           placeholder="Masukkan password"
//                           disabled={isLoading}
//                           {...field}
//                         />
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="icon"
//                           className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
//                           onClick={() => setShowPassword(!showPassword)}
//                         >
//                           {showPassword ? (
//                             <EyeOff className="h-4 w-4 text-muted-foreground" />
//                           ) : (
//                             <Eye className="h-4 w-4 text-muted-foreground" />
//                           )}
//                         </Button>
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <Button type="submit" className="w-full" disabled={isLoading}>
//                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 Masuk
//               </Button>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// ========= V2 =============

// app/(auth)/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "js-cookie";
import { Package, Loader2, Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import apiClient from "@/lib/api/client";
import { TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/lib/constants";
import { ApiResponse, AuthResponse } from "@/types";
import { toast } from "sonner";

const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(1, "Password wajib diisi"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);

    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        data
      );
      const { user, access_token, refresh_token } = response.data.data;

      Cookies.set(TOKEN_KEY, access_token, { expires: 7 });
      if (refresh_token) {
        Cookies.set(REFRESH_TOKEN_KEY, refresh_token, { expires: 30 });
      }

      toast("Login Berhasil", {
        description: `Selamat datang, ${user.full_name || user.username}!`,
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Terjadi kesalahan saat login";
      toast.warning("Login Gagal", {
        description: message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-100 to-slate-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary">
            <Package className="h-8 w-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">
            PKM Asset Management
          </CardTitle>
          <CardDescription>
            Masuk dengan username dan password Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Masukkan password"
                          disabled={isLoading}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Masuk
              </Button>
            </form>
          </Form>

          {/* Development Info */}
          <div className="mt-6 rounded-lg border bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground text-center">
              Demo: Gunakan username dan password yang telah disediakan
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
