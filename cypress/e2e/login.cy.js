/// <reference types="Cypress" />

describe("Test Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("captcha sum number correctly", () => {

    cy.get('[data-test="button-login"]').should("not.exist");

    cy.wait(1500);

    cy.get('[data-test="text-numbers-captcha"]')
      .invoke("text")
      .as("textCaptcha");

    cy.get("@textCaptcha").then((text) => {
      const teste = text.replace("Soma", "").trim().split("+");
      const firstNumber = Number(teste[0]);
      const secondNumber = Number(teste[1]);

      const resultSum = String(firstNumber + secondNumber);

      cy.wait(1500);

      cy.get('[data-test="input-sum-captcha"]').type(resultSum);

      cy.wait(1500);

      expect(Number(resultSum)).to.equal(firstNumber + secondNumber)

      cy.get('[data-test="button-check-captcha"]').click();

      // cy.get('[data-test="button-login"]').should("exist");
      cy.contains('Login').should("exist");

    });

  });

  it("captcha sum number incorrectly", () => {

    cy.get('[data-test="button-login"]').should("not.exist"); //parâmetro não existe "data-test="button-login"

    cy.wait(1500);

    cy.get('[data-test="text-numbers-captcha"]')
      .invoke("text")
      .as("textCaptcha");

    cy.get("@textCaptcha").then((text) => {
      const teste = text.replace("Soma", "").trim().split("+");
      const firstNumber = Number(teste[0]);
      const secondNumber = Number(teste[1]);

      const resultSum = String(firstNumber + secondNumber + 1);

      cy.wait(1500);

      cy.get('[data-test="input-sum-captcha"]').type(resultSum);

      cy.wait(1500);

      expect(Number(resultSum)).not.to.equal(firstNumber + secondNumber)

      cy.get('[data-test="button-check-captcha"]').click();

      cy.get('[data-test="button-login"]').should("not.exist");

    });

  });

  it('should log in successfully', () => {

    cy.get('#basic_email').should("be.visible").type("suporte@fabrica704.com.br")
    cy.get('#basic_password').should("be.visible").type("admin12")

    cy.get('[data-test="text-numbers-captcha"]')
      .invoke("text")
      .as("textCaptcha");

    cy.get("@textCaptcha").then((text) => {
      const teste = text.replace("Soma", "").trim().split("+");
      const firstNumber = Number(teste[0]);
      const secondNumber = Number(teste[1]);

      const resultSum = String(firstNumber + secondNumber);

      cy.wait(1500);

      cy.get('[data-test="input-sum-captcha"]').type(resultSum);

      cy.wait(1500);

      expect(Number(resultSum)).to.equal(firstNumber + secondNumber)

      cy.get('[data-test="button-check-captcha"]').click();

      cy.wait(1500);

      cy.get("button[type='submit']").click()

    });

  });

  it('should log failed', () => {

    cy.get('[data-test="text-numbers-captcha"]')
      .invoke("text")
      .as("textCaptcha");

    cy.get("@textCaptcha").then((text) => {
      const teste = text.replace("Soma", "").trim().split("+");
      const firstNumber = Number(teste[0]);
      const secondNumber = Number(teste[1]);

      const resultSum = String(firstNumber + secondNumber);

      cy.wait(1500);

      cy.get('[data-test="input-sum-captcha"]').type(resultSum);

      cy.wait(1500);

      expect(Number(resultSum)).to.equal(firstNumber + secondNumber)

      cy.get('[data-test="button-check-captcha"]').click();

      cy.wait(1500);

      cy.get("button[type='submit']").click()

      cy.contains("Por favor insira seu email!").should("be.visible")
      cy.contains("Por favor insira sua senha!").should("be.visible")

    });

  });

  it.skip('should click until you find the sum of the captcha', () => {

    function checkCaptcha() {
      cy.get('[data-test="text-numbers-captcha"]')
        .invoke("text")
        .as("textCaptcha");

      cy.get("@textCaptcha").then((text) => {
        const teste = text.replace("Soma", "").trim().split("+");
        const firstNumber = Number(teste[0]);
        const secondNumber = Number(teste[1]);

        const resultSum = firstNumber + secondNumber;

        cy.get('[data-test="input-sum-captcha"]').type(10);

        if (resultSum !== 10) {
          cy.get('[data-test="input-sum-captcha"]').clear();
          cy.get('[data-test="button-check-captcha"]').click();

          cy.wait(500);

          checkCaptcha();
        }
      });
    }
    
    checkCaptcha();

    cy.get('[data-test="button-check-captcha"]').click();
    cy.get("button[type='submit']").should("be.visible")

  });

});
