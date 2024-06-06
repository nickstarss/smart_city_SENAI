from django.http import HttpResponse
from django.shortcuts import render

def abre_index(request):
    mensagem = 'Olá Projeto Integrador!'
    return HttpResponse(mensagem)