from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
import json
import score.scoreboard as sb
import pandas as pd
import numpy
def index(request):
    context          = {}
    context['hello'] = 'Hello World!'
    return render(request, 'index.html', context)

from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def getcodes(request):

    message = request.POST.get("mesage")

    result = sb.viewAllResult(message)

    ha = sb.getinstruction(message)
    a = pd.DataFrame()
    a['0'] = ha
    a.to_csv("a.csv")
    # print(json.dumps(result.getList()))
    return HttpResponse(json.dumps(result.getList()), content_type='application/json')

@csrf_exempt
def getnumbers(request):
    m = pd.read_csv("a.csv")
    valueCode = m.values[:, 1][:-1]
    numa = int(request.POST.get("istrue"))
    num = int(request.POST.get("mesage"))

    if numa==1:
        end_cycle,insTable, funcUTable, registerTable = sb.goto_cycle(num,valueCode)
        # print(json.dumps(result.getList()))
        a=dict()
        a["end_cycle"]=end_cycle
        a['insTable']=insTable.getList()
        a['funcUTable']=funcUTable.getList()
        a['registerTable']=registerTable.getDict()
    else:
        a=1
    return HttpResponse(json.dumps(a), content_type='application/json')

if __name__ == '__main__':
    result = sb.viewAllResult("LD F6 34+ R2\n-1")

    ha = sb.getinstruction("LD F6 34+ R2\n-1")
    a= pd.DataFrame()
    a['0']=ha
    a.to_csv("a.csv")
    # print(json.dumps(result.getList()))
    m=pd.read_csv("a.csv")
    # print(m.values[:,1])
    print(m.values[:,1][:-1])
    end_cycle, insTable, funcUTable, registerTable = sb.goto_cycle(1, m.values[:,1][:-1])
    # print(json.dumps(result.getList()))

    a = dict()
    a["end_cycle"] = end_cycle
    a['insTable'] = insTable.getList()
    a['funcUTable'] = funcUTable.getList()
    a['registerTable'] = registerTable.getDict()
    json.dumps(a)
