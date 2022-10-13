<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'new_id' => 'required',
            'title' => 'nullable',
            'content' => 'nullable',
        ];
    }

    public function messages()
    {
        return [
            'new_id.required' => 'The new id field is required.' ,
        ];
    }
}
