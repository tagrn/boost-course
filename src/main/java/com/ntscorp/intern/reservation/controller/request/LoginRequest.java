package com.ntscorp.intern.reservation.controller.request;

public class LoginRequest {
	private String email;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "LoginRequest [email=" + email + "]";
	}
}