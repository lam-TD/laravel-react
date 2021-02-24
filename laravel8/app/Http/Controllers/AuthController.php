<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use App\Traits\ApiResponser;

class AuthController extends Controller
{
    use ApiResponser;
    public function register(Request $request)
    {
        $validator  =   Validator::make($request->all(), [
            "name"  =>  "required",
            "email"  =>  "required|email|unique:users,email",
            "password"  =>  "required"
        ]);

        if($validator->fails()) {
            return $this->error(
                "Validation errors",
                Response::HTTP_OK,
                ["validation_errors" => $validator->errors()]
            );
        }

        $user = User::create([
            'name' => $request->input('name'),
            'password' => bcrypt($request->input('password')),
            'email' => $request->input('email')
        ]);

        return $this->success($user, "User register successful");
    }

    public function login(Request $request)
    {
        $attr = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return $this->error('Credentials not match', 401);
        }

        $data = [
            "user" => auth()->user(),
            "access_token" => auth()->user()->createToken('API Token')->plainTextToken
        ];
        return $this->success($data);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return $this->success([
            'message' => 'Tokens Revoked'
        ]);
    }

    public function me($user_id)
    {
        $user = User::find($user_id);
        return response()->json([
            "status" => "OK",
            "data" => $user
        ], Response::HTTP_OK);
    }

    public function updateProfile(Request $request)
    {
        $validator  =   Validator::make($request->all(), [
            "user_id"  =>  "required",
            "name"  =>  "required",
        ]);

        if($validator->fails()) {
            return $this->error(
                "Validation errors",
                Response::HTTP_OK,
                ["validation_errors" => $validator->errors()]
            );
        }

        $user_id = $request->input('user_id');
        $userIsExisted = User::find($user_id);
        if ($userIsExisted) {
            $update = User::where('id', $user_id)->update(['name' => $request->input('name')]);
            return $this->success($update);
        }

        return $this->error('User doesn\'t exist', Response::HTTP_OK);
    }

    public function invalidToken()
    {
        return $this->error('Invalid Token', Response::HTTP_UNAUTHORIZED);
    }
}
