class notaDefinitiva {
    public notaParcial: number = 5.0;

    public validarNota() {
        if(this.notaParcial < 3.0) {
            console.log('Kill teacher');
        } else {
            console.log('Party');
        }
    }
}
